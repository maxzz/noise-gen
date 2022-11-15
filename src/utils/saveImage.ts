export const saveBlobData = (function () {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = 'none';
    a.id = 'noise-gen-image';
    return function (blob: Blob, fileName: string) {
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

/*
    async function supportsImgType(type) {
        let img = document.createElement('img');
        document.createElement('picture').append(
            Object.assign(document.createElement('source'), {
                srcset: 'data:,x',
                type
            }),
            img
        );
        await 0;
        return !!img.currentSrc;
    }

    supportsImgType('image/avif').then(avifSupported => {
        const src = avifSupported ? 'kitten-170.avif' : 'kitten-170.jpg';

        const blobLink = document.getElementById('blob-link');
        const dataLink = document.getElementById('data-link');

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0);

            canvas.toBlob(blob => {
                const blobUrl = URL.createObjectURL(blob);
                blobLink.href = blobUrl;
            }, 'image/jpeg', 0.9);

            dataLink.href = canvas.toDataURL('image/jpeg', 0.9);
        };
        image.src = src;
    });
*/
