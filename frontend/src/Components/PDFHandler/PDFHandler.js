import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { summarizePDF } from '../../features/toolSlice';
import './PDFHandler.css';

const PDFHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfjs, setPdfjs] = useState(null);
  const dispatch = useDispatch();
  const summary = useSelector((state) => state.tools.summary);

  useEffect(() => {
    // Load pdf.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize pdf.js
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      setPdfjs(window.pdfjsLib);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePDFUpload = async (file) => {
    if (!file || !pdfjs) return;
    
    setIsLoading(true);
    setError(null);
    console.log('Starting PDF processing...');

    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          console.log('Reading PDF file...');
          const typedarray = new Uint8Array(e.target.result);
          const pdf = await pdfjs.getDocument({ data: typedarray }).promise;
          let fullText = '';

          console.log(`PDF has ${pdf.numPages} pages`);
          // Extract text from each page
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
          }

          console.log('Extracted text length:', fullText.length);
          console.log('First 100 characters:', fullText.substring(0, 100));

          // Dispatch the extracted text to Redux for summarization
          console.log('Dispatching text for summarization...');
          dispatch(summarizePDF(fullText))
            .then((result) => {
              console.log('Summarization result:', result);
              if (result.error) {
                setError(result.error);
              }
            })
            .catch((err) => {
              console.error('Summarization error:', err);
              setError('Error during summarization: ' + err.message);
            });
        } catch (err) {
          console.error('PDF processing error:', err);
          setError('Error processing PDF: ' + err.message);
        } finally {
          setIsLoading(false);
        }
      };

      reader.onerror = (err) => {
        console.error('File reading error:', err);
        setError('Error reading file: ' + err.message);
        setIsLoading(false);
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error('File handling error:', err);
      setError('Error handling file: ' + err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="pdf-handler">
      <div className="upload-section">
        <h3>Upload PDF</h3>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => handlePDFUpload(e.target.files[0])}
          disabled={isLoading || !pdfjs}
        />
        {!pdfjs && <p className="loading">Loading PDF library...</p>}
      </div>

      {isLoading && <p>Processing PDF...</p>}
      {error && <p className="error">{error}</p>}
      {summary?.loading && <p>Summarizing content...</p>}
      {summary?.error && <p className="error">Summarization error: {summary.error}</p>}
    </div>
  );
};

export default PDFHandler; 