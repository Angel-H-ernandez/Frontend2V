import React from 'react';
import { jsPDF } from 'jspdf';
import './ArticleCard.css';

const ArticleCard = ({ title, description, body, imageUrl, url }) => {
  const generatePDF = async () => {
    const doc = new jsPDF();

    // Asegurarse de que title, description y body no sean undefined o null
    const safeTitle = title || 'No Title';
    const safeDescription = description || 'No Description';
    const safeBody = body || 'No Body Content';

    // Configuración de fuente y tamaño para el título
    const margin = 20;
    const lineSpacing = 10;
    let currentHeight = margin;

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 255); // Azul
    const splitTitle = doc.splitTextToSize(safeTitle, 170 - margin);
    splitTitle.forEach(line => {
      doc.text(line, margin, currentHeight);
      currentHeight += lineSpacing;
    });

    // Configuración de tamaño de fuente para la descripción
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Negro

    // Separar el texto en líneas si es necesario
    const splitDescription = doc.splitTextToSize(safeDescription, 170 - margin); // Ajustar el ancho del texto a 170 unidades menos el margen derecho
    splitDescription.forEach(line => {
      doc.text(line, margin, currentHeight);
      currentHeight += lineSpacing;
    });

    // Configuración de fuente y tamaño para el body
    doc.setFont('Helvetica', 'italic');
    doc.setFontSize(12);

    // Margen superior antes del body
    currentHeight += lineSpacing * 2;

    // Separar el texto del body en líneas si es necesario
    const splitBody = doc.splitTextToSize(safeBody, 170 - margin);
    splitBody.forEach(line => {
      doc.text(line, margin, currentHeight);
      currentHeight += lineSpacing;
    });

    // If there's an image URL, fetch the image and add it to the PDF
    if (imageUrl) {
      try {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // This is necessary for CORS
        img.src = imageUrl;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 4, 4);

          const imgData = canvas.toDataURL('image/jpeg');
          doc.addImage(imgData, 'JPEG', margin, currentHeight, 160, 90); // Adjust the width and height as needed

          // After adding the image, save the PDF
          doc.save(`${safeTitle}.pdf`);
        };
      } catch (error) {
        console.error('Error loading image:', error);
        // Still save the PDF if image loading fails
        doc.save(`${safeTitle}.pdf`);
      }
    } else {
      // If there's no image, just save the PDF
      doc.save(`${safeTitle}.pdf`);
    }
  };

  return (
    <div className="article-card">
      {imageUrl && <img src={imageUrl} alt="Article" className="article-image" />}
      <div className="article-content">
        <a href={url} className="article-title">{title}</a>
        <p className="article-description">{description}</p>
        <button onClick={generatePDF} className="generate-pdf-button">Generate PDF</button>
      </div>
    </div>
  );
};

export default ArticleCard;
