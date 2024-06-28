document.addEventListener('DOMContentLoaded', function () {
    const galleryContainer = document.getElementById('behold-gallery');
    const apiUrl = 'https://feeds.behold.so/TvLlp6N8ElIk4FWR5cfa';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.posts && data.posts.length > 0) {
                data.posts.forEach(post => {
                    if (post.mediaType === 'CAROUSEL_ALBUM') {
                        // If the post is a carousel album, iterate over its children
                        post.children.forEach(child => {
                            createGalleryItem(child, galleryContainer, post.caption);
                        });
                    } else {
                        // For other media types, just create a gallery item
                        createGalleryItem(post, galleryContainer);
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching Behold.so feed:', error));
});

function createGalleryItem(item, container, caption = '') {
    const article = document.createElement('article');
    const link = document.createElement('a');
    link.href = item.permalink || item.mediaUrl;
    link.className = 'image';
    link.target = '_blank';

    if (item.mediaType === 'VIDEO') {
        // Handle video posts
        const video = document.createElement('video');
        video.src = item.mediaUrl;
        video.controls = true;
        video.autoplay = false;
        video.muted = true;
        video.className = 'instagram-video';
        link.appendChild(video);
    } else {
        // Handle image posts
        const img = document.createElement('img');
        img.src = item.mediaUrl;
        img.alt = caption || 'Instagram Post';
        link.appendChild(img);
    }

    const captionDiv = document.createElement('div');
    captionDiv.className = 'caption';
    const h3 = document.createElement('h3');
    h3.textContent = caption || 'Instagram Post';
    captionDiv.appendChild(h3);
    article.appendChild(link);
    article.appendChild(captionDiv);
    container.appendChild(article);
}
