'use strict';

class SideNav{
  constructor(){
    this.showButtonEl = document.querySelector('.js-menu-show');
    this.hideButtonEl = document.querySelector('.js-menu-hide');
    this.SideNavEl = document.querySelector('.js-side-nav');
    this.sideNavContainerEl = document.querySelector('.js-side-nav-container');

    this.showSideNav = this.showSideNav.bind(this);
    this.hideSideNav = this.hideSideNav.bind(this);
    this.blockClicks = this.blockClicks.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);

    this.startX = 0;
    this.currentX = 0;
    this.addEventListeners();
  }

    addEventListeners(){
      this.showButtonEl.addEventListener('click', this.showSideNav);
      this.hideButtonEl.addEventListener('click', this.hideSideNav);
      this.SideNavEl.addEventListener('click', this.hideSideNav);
      this.sideNavContainerEl.addEventListener('click', this.blockClicks);
      document.addEventListener('touchstart', this.onTouchStart);
      document.addEventListener('touchmove', this.onTouchMove);
      document.addEventListener('touchend', this.onTouchEnd);
    }

    onTouchStart(e){
      if(this.SideNavEl.classList.contains('side-nav--visible'))
      return;

    //  e.preventDefault();
      this.startX = e.touches[0].pageX;
      this.currentX = this.startX;
    }

    onTouchMove(e){
      this.currentX = e.touches[0].pageX;
      const translateX = Math.min(0, this.currentX - this.startX);

      if(translateX < 0){
      //  e.preventDefault();
      }

      this.sideNavContainerEl.style.transform = `translateX(${translateX}px)`;
    }

    onTouchEnd(e){
        const translateX = Math.min(0, this.currentX - this.startX);
        if(translateX < 0){
          this.sideNavContainerEl.style.transform = '';
          this.hideSideNav();
        }
    }

    blockClicks(e){
      e.stopPropagation();
    }

    onTransitionEnd(e){
        this.SideNavEl.classList.remove('side-nav--animatable');
        this.SideNavEl.removeEventListener('transitionend', this.onTransitionEnd);
    }

    showSideNav(){
      this.SideNavEl.classList.add('side-nav--visible');
      this.SideNavEl.classList.add('side-nav--animatable');
      this.SideNavEl.addEventListener('transitionend', this.onTransitionEnd);
    }

    hideSideNav(){
      this.SideNavEl.classList.remove('side-nav--visible');
      this.SideNavEl.classList.add('side-nav--animatable');
      this.SideNavEl.addEventListener('transitionend', this.onTransitionEnd);
    }
  }

new SideNav();
