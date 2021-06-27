const saveBlobData = (function () {
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

export default saveBlobData;