window.addEventListener('DOMContentLoaded', () => {
    const postImg = document.querySelector('.post-main-img');
    const imgWrap = document.querySelector('.post-image-wrap');

    if (postImg && imgWrap) {

        const applyAmbientLighting = () => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
   
                canvas.width = 1;
                canvas.height = 1;

                ctx.drawImage(postImg, 0, 0, 1, 1);
                
                const imgData = ctx.getImageData(0, 0, 1, 1).data;
                const r = imgData[0];
                const g = imgData[1];
                const b = imgData[2];

                imgWrap.style.boxShadow = `0 0 20px rgba(${r}, ${g}, ${b}, 0.4), 0 0 40px rgba(${r}, ${g}, ${b}, 0.2)`;
            } catch (error) {
                console.log("Не удалось считать цвет картинки из-за настроек CORS. Используем базовый багровый.");
                imgWrap.style.boxShadow = "0 0 20px rgba(184, 29, 36, 0.35), 0 0 40px rgba(184, 29, 36, 0.15)";
            }
        };

        if (postImg.complete) {
            applyAmbientLighting();
        } else {
            postImg.addEventListener('load', applyAmbientLighting);
        }
    }
});
