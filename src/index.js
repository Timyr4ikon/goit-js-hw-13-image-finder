import './styles.css';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import '../node_modules/materialize-css/dist/css/materialize.css';
import '../node_modules/materialize-css/dist/js/materialize.js';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import request from './apiService.js';
import createGalleryItem from './li.hbs';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesLoaded';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import InfiniteScroll from 'infinite-scroll';
PNotify.defaults.delay = 2500;
const basicLightbox = require('basiclightbox');
const gallery = document.querySelector('.grid');
const searchForm = document.querySelector('#search-form');
const btn = document.querySelector('button');
searchForm.addEventListener('submit', sendRequest);
function sendRequest(e) {
  e.preventDefault();
  PNotify.info({
    text: 'Please, wait',
  });
  const searchInput = searchForm.querySelector('#search');
  request.page = 1;
  request.value = searchInput.value;
  searchInput.value = '';
  request.fetchRequest().then(data => {
      
        if(data.totalHits === 0){
            PNotify.error({
                text: 'No results!',
              });
        }
        else{
        gallery.innerHTML = `<div class="grid-sizer"></div>${createGalleryItem(
      data.hits,
    )}`;
    imagesLoaded('#imgPixabay', function(instance) {
      const msnry = new Masonry(gallery, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 5,
        transitionDuration: '0.5s',
      });
      const images = document.querySelectorAll('#imgPixabay');
      images.forEach(el => {
        el.addEventListener('click', event => {
          let src = event.toElement.src; //вот а фак - потом покажу
          console.log(event);
          const instance = basicLightbox.create(
            `<img src="${src}" style="pointer-events: all" width="960">`,
            { closable: true },
          );
          el.onerror = () => {
            el.display = 'none';
          };
          instance.show(() => {
            const boxOverlay = document.querySelector(
              '.basicLightbox__placeholder',
            );
            boxOverlay.addEventListener('click', e => {
              if (e.target.nodeName !== 'IMG') {
                instance.close();
              }
            });
            document.addEventListener('keydown', e => {
              if (e.code === 'Escape') {
                instance.close();
              }
            });
          });
        });
      });
    });
    PNotify.success({
      text: 'My сongratulations!',
    });
    btn.classList = 'db';
    btn.addEventListener('click',LoadMore);
    }   
    if(gallery.children.length-1 === data.totalHits){
        btn.classList = 'dn';
    }
  });
}
function LoadMore(){
    PNotify.info({
        text: 'Please, wait',
      });
    request.page +=1;
    request.fetchRequest().then(data => {
        gallery.innerHTML += createGalleryItem(data.hits);
        imagesLoaded('#imgPixabay', function(instance) {
          const msnry = new Masonry(gallery, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            gutter: 5,
            transitionDuration: '0.5s',
          });
          const images = document.querySelectorAll('#imgPixabay');
          images.forEach(el => {
            el.addEventListener('click', event => {
              let src = event.toElement.src; //вот а фак - потом покажу
              console.log(event);
              const instance = basicLightbox.create(
                `<img src="${src}" style="pointer-events: all" width="960">`,
                { closable: true },
              );
              el.onerror = () => {
                el.display = 'none';
              };
              instance.show(() => {
                const boxOverlay = document.querySelector(
                  '.basicLightbox__placeholder',
                );
                boxOverlay.addEventListener('click', e => {
                  if (e.target.nodeName !== 'IMG') {
                    instance.close();
                  }
                });
                document.addEventListener('keydown', e => {
                  if (e.code === 'Escape') {
                    instance.close();
                  }
                });
              });
            });
          });
        });
        PNotify.success({
          text: 'My сongratulations!',
        });
      })
     
      
}