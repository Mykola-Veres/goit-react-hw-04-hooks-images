import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArticleConteiner } from './App.styled';
import Searchbar from '../Searchbar';
import ImagesAPI from '../../services/ImagesAPI';
import ImageGallery from '../ImageGallery';
import ButtonLoad from '../ButtonLoad';
import Loader from '../Loader';
import Modal from '../Modal';


export default function App () {
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  const [activeImge, setActiveImge] = useState("");
  const [tags, setTags] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {setImages([])},
  [query])

  useEffect(() => {
    if (query === "") {return}    
    setVisible(true)    
    setStatus('pending')
      ImagesAPI.fetchImages(query, page)
        .then(({ hits }) => {
          if (!query) {setStatus('idle')          
          return toast.error(
            `There are no matching images for this request: ${query} !`)
          }
          if (hits.length === 0) {
            setStatus('resolved')
            setVisible(false)                    
            return toast.error(
              `There are no matching images for this request: ${query} !`)}
          setImages(prevImages => [...prevImages, ...hits])
          setStatus('resolved')
        })
        .finally(() => {
          if (page > 1) {scrollTo()}
        })
        .catch(error => {         
          setError(error)
          setStatus('rejected')          
          return toast.error(
            `There are no matching images for this request: ${query} !`)
        })
  }, [query, page])

  const scrollTo = () => {
    const gallery = document.querySelector('.gallery');
    const cardHeight = gallery.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  };

  const handlerSubmitUserQuery = query => {
    setQuery(query.trim())
    setPage(1)    
  };

  const handlerClickLoadMore = () => {setPage(prevPage => prevPage + 1)}; 

  const handleronClickImage = (activeImge, tags) => {
    setActiveImge(activeImge)
    setTags(tags)
    setShowModal(prevShowModal => !prevShowModal)
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal)};

    if (status === 'idle') {
      return (
        <ArticleConteiner>
          <ToastContainer position="top-center" autoClose={2000} />
          <Searchbar onSubmit={handlerSubmitUserQuery} />
        </ArticleConteiner>
      );
    }

    if (status === 'rejected') {
      return (
        <ArticleConteiner>
          <Searchbar onSubmit={handlerSubmitUserQuery} />
          <h2>{error.massage}</h2>
        </ArticleConteiner>
      );
    }

    if (status === 'pending') {
      return (
        <ArticleConteiner>
          <ToastContainer position="top-center" autoClose={2000} />
          <Searchbar onSubmit={handlerSubmitUserQuery} />
          <ImageGallery
            userImages={images}
            onClick={handleronClickImage}
          />
          <Loader />
        </ArticleConteiner>
      );
    }

    if (status === 'resolved') {
      return (
        <ArticleConteiner>
          <ToastContainer position="top-center" autoClose={2000} />
          <Searchbar onSubmit={handlerSubmitUserQuery} />
          <ImageGallery
            userImages={images}
            onClick={handleronClickImage}
          />
          {images.length && visible && (
            <ButtonLoad onClick={handlerClickLoadMore} />
          )}
          {showModal && (
            <Modal image={activeImge} tags={tags} onClose={toggleModal} />
          )}
        </ArticleConteiner>
      );
    }
  }
