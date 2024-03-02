import React, { useState } from 'react';
import './ImageList.css';
import ImageModal from '../ImageModal/ImageModal';

interface Image {
  id: string;
  description: string;
  urls: {
    regular: string;
  };
}

interface ImageListProps {
  images: Image[];
}

const ImageList: React.FC<ImageListProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const handleImageClick = (imageId: string) => {
    setIsModalOpen(true);
    setSelectedImageId(imageId);
  };

  return (
    <>
      <div className="image-list">
        {images.map((image, index) => (
          <div key={`${image.id}-${index}`} style={{ margin: '10px' }} onClick={() => handleImageClick(image.id)}>
            <img src={image.urls.regular} alt={image.description} style={{ cursor: 'pointer' }} />
          </div>
        ))}
      </div>
      {selectedImageId && (
        <ImageModal
          isOpen={isModalOpen}
          imageId={selectedImageId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ImageList;
