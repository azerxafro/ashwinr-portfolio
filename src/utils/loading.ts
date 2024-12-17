export function showLoading() {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

export function hideLoading() {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

export function initLoading() {
  // Hide loading screen when the page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(hideLoading, 300); // Small delay for smoother transition
  });

  // Show loading screen on page transitions
  document.addEventListener('astro:before-preparation', showLoading);
  document.addEventListener('astro:after-preparation', () => {
    setTimeout(hideLoading, 300);
  });

  // Handle initial page load
  if (document.readyState === 'complete') {
    hideLoading();
  }
}