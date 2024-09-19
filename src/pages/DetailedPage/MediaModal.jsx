import React from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const MediaModal = ({ open, onClose, media }) => {
  const isImage = (url) => /\.(jpeg|jpg|gif|png|webp)$/i.test(url);
  const isVideo = (url) => /\.(mp4|webm|ogg|mov)$/i.test(url);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      className="relative"
    >
      <DialogContent className="relative p-0">
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          className="absolute top-2 right-0 z-10 text-white"
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>

        {/* Media Display */}
        {media ? (
          <>
            {isVideo(media) ? (
              <video controls src={media} className="w-full h-auto" />
            ) : isImage(media) ? (
              <img src={media} alt="Media" className="w-full h-auto object-cover" />
            ) : (
              <div className="text-center text-gray-600">Unsupported media type</div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-600">No media available</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MediaModal;
