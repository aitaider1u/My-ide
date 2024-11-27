import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

function Preview() {
    const files = useSelector((state) => state.code.value);

    const iframeRef = useRef(null);

    // Récupère le contenu HTML, CSS, et JS des fichiers
    const getFileContent = (type) => {
        const file = files.find((file) => file.type === type);
        return file ? file.code : "";
    };

    const htmlContent = getFileContent("html");
    const cssContent = getFileContent("css");
    const jsContent = getFileContent("js");

    useEffect(() => {
        if (iframeRef.current) {
            const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;

            // Inject HTML
            iframeDoc.open();
            iframeDoc.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <style>${cssContent}</style>
                </head>
                <body>
                    ${htmlContent}
                    <script>
                        ${jsContent}
                    </script>
                </body>
                </html>
            `);
            iframeDoc.close();
        }
    }, [htmlContent, cssContent, jsContent]); // Réinjecte le contenu à chaque changement

    return (
        <div className=" mt-10 preview-container relative w-full h-full border border-gray-300 rounded-lg">
            <iframe
                ref={iframeRef}
                className="w-full h-full"
                title="Preview"
            />
        </div>
    );
}

export default Preview;
