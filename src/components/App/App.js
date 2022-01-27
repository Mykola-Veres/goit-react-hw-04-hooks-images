import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArticleConteiner } from './App.styled';
import Searchbar from '../Searchbar';
import ImagesAPI from '../../services/ImagesAPI';
import ImageGallery from '../ImageGallery';
import ButtonLoad from '../ButtonLoad';
import Loader from '../Loader';
import Modal from '../Modal';

class App extends Component {
  state = {
    images: null,
    page: 1,
    query: '',
    error: '',
    status: 'idle',
    activeImge: '',
    tags: '',
    showModal: false,
    visible: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState({ images: [], status: 'pending' });
    }

    if (prevState.query !== query || prevState.page !== page) {
      if (page > 1) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }

      this.setState({ status: 'pending', visible: true });
      ImagesAPI.fetchImages(query, page)
        .then(({ hits }) => {
          if (!query) {
            this.setState({ status: 'idle' });
            return this.notify();
          }
          if (hits.length === 0) {
            this.setState({ status: 'resolved', visible: false });
            return this.notify();
          }
          this.setState(({ images }) => ({
            images: [...images, ...hits],
            status: 'resolved',
          }));
          if (page > 1) {
            this.scrollTo();
          }
          return hits;
        })
        .then(hits => this.scrollTo())
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  scrollTo = () => {
    const gallery = document.querySelector('.gallery');
    const cardHeight = gallery.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: cardHeight * 4,
      behavior: 'smooth',
    });
  };

  handlerSubmitUserQuery = query => {
    this.setState({ query: query.trim(), page: 1 });
  };

  handlerClickLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  notify = () =>
    toast.error(
      `There are no matching images for this request: ${this.state.query} !`,
    );

  handleronClickImage = (activeImge, tags) => {
    this.setState({ activeImge, tags });
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { images, status, error, activeImge, showModal, tags, visible } =
      this.state;

    if (status === 'idle') {
      return (
        <ArticleConteiner>
          <ToastContainer position="top-center" autoClose={2000} />
          <Searchbar onSubmit={this.handlerSubmitUserQuery} />
        </ArticleConteiner>
      );
    }

    if (status === 'rejected') {
      return (
        <ArticleConteiner>
          <Searchbar onSubmit={this.handlerSubmitUserQuery} />
          <h2>{error.massage}</h2>
        </ArticleConteiner>
      );
    }

    if (status === 'pending') {
      return (
        <ArticleConteiner>
          <ToastContainer position="top-center" autoClose={2000} />
          <Searchbar onSubmit={this.handlerSubmitUserQuery} />
          <ImageGallery
            userImages={images}
            onClick={this.handleronClickImage}
          />
          <Loader />
        </ArticleConteiner>
      );
    }

    if (status === 'resolved') {
      return (
        <ArticleConteiner>
          <ToastContainer position="top-center" autoClose={2000} />
          <Searchbar onSubmit={this.handlerSubmitUserQuery} />
          <ImageGallery
            userImages={images}
            onClick={this.handleronClickImage}
          />
          {images.length && visible && (
            <ButtonLoad onClick={this.handlerClickLoadMore} />
          )}
          {showModal && (
            <Modal image={activeImge} tags={tags} onClose={this.toggleModal} />
          )}
        </ArticleConteiner>
      );
    }
  }
}
export default App;
