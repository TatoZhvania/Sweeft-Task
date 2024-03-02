import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ImageModal.css";

interface ModalProps {
  isOpen: boolean;
  imageId: string;
  onClose: () => void;
}

interface ImageStats {
  downloads: number;
  views: number;
  likes: number;
}

const ImageModal: React.FC<ModalProps> = ({ isOpen, imageId, onClose }) => {
  const [stats, setStats] = useState<ImageStats | null>(null);

  useEffect(() => {
    if (isOpen && imageId) {
      const fetchStats = async () => {
        try {
          const response = await axios.get(
            `https://api.unsplash.com/photos/${imageId}/statistics`,
            {
              headers: {
                Authorization:
                  "Client-ID sEdYYIA2IifWVlKGzg-tWntBNwqg1vvPvBGIGzJAxKs",
              },
            }
          );
          const { downloads, views, likes } = response.data;
          setStats({
            downloads: downloads.total,
            views: views.total,
            likes: likes.total,
          });
        } catch (error) {
          console.error("Error fetching image statistics:", error);
        }
      };

      fetchStats();
    }
  }, [isOpen, imageId]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {stats && (
          <div className="modal-stats">
            <div>
              <p>Downloads: {stats.downloads}</p>
              <p>Views: {stats.views}</p>
              <p>Likes: {stats.likes}</p>
            </div>
            <img
              src={`https://unsplash.com/photos/${imageId}/download?force=true`}
              alt="Full size"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
