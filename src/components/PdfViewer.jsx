import React from 'react';

const PdfViewer = ({ file }) => (
  <div style={{ width: '100%', height: '90vh' }}>
    <embed src={file} type="application/pdf" width="100%" height="100%" />
  </div>
);

export default PdfViewer;
