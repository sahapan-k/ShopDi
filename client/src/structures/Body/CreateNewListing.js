import React, { useEffect, useRef, useState } from 'react';
import styles from './CreateNewListing.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Rotator from 'exif-auto-rotate';

import GenericButton from '../../components/Button/GenericButton';
import { useSelector } from 'react-redux';

let resetImage;

const EmptyPreviewBox = () => (
  <div className={styles['empty-preview-box']}></div>
);

const CreateNewListing = () => {
  let retrievedToken = useSelector((state) => state.auth.token);
  const [previewImage, setPreviewImage] = useState();
  const [previewImageURL, setPreviewImageURL] = useState();

  useEffect(() => {
    if (!previewImage) return;
    const newPreviewImageURL = URL.createObjectURL(previewImage);
    setPreviewImageURL(newPreviewImageURL);
  }, [previewImage]);

  const onImageChange = (event) => {
    setPreviewImage(event.target.files[0]);
  };

  const clearInputAfterSubmit = () => {
    itemNameInputRef.current.value = '';
    itemPriceInputRef.current.value = '';
    itemStockNumberInputRef.current.value = '';
    itemCategoryInputRef.current.value = '';
    itemDescriptionInputRef.current.value = '';
    itemImageInputRef.current.value = '';
    itemImageInputRef.current.files[0] = '';
    setPreviewImage('');
  };

  const itemImageInputRef = useRef();
  const itemNameInputRef = useRef();
  const itemPriceInputRef = useRef();
  const itemStockNumberInputRef = useRef();
  const itemCategoryInputRef = useRef();
  const itemDescriptionInputRef = useRef();

  const createListingHandler = async (event) => {
    event.preventDefault();
    const enteredItemName = itemNameInputRef.current.value;
    const enteredItemPrice = itemPriceInputRef.current.value;
    const enteredItemStockNumber = itemStockNumberInputRef.current.value;
    const enteredItemCategory = itemCategoryInputRef.current.value;
    const enteredItemDescription = itemDescriptionInputRef.current.value;
    const enteredItemImage = itemImageInputRef.current.files[0];

    try {
      ////////// Reset Item Image Orientation
      if (enteredItemImage.type === 'image/jpeg') {
        const targetImage = enteredItemImage;
        resetImage = await Rotator.createRotatedImageAsync(targetImage, 'blob');
        // resetImage = exifremove.remove(enteredItemImage);
      } else {
        resetImage = enteredItemImage;
      }
    } catch (error) {
      let errorMessage =
        error.response.data.message ||
        'Image file corrupted! Please try again with another image file.';
      Swal.fire({
        position: 'top',
        icon: 'error',
        toast: true,
        title: errorMessage,
        showConfirmButton: false,
        timer: 4000,
        color: '#ff3333',
      });
    }

    const sentForm = new FormData();
    sentForm.append('name', enteredItemName);
    sentForm.append('price', enteredItemPrice);
    sentForm.append('stockNumber', enteredItemStockNumber);
    sentForm.append('description', enteredItemDescription);
    sentForm.append('category', enteredItemCategory);
    sentForm.append('itemImage', resetImage);

    try {
      await axios({
        method: 'POST',
        url: '/api/v1/items/createItem',
        // url: 'http://localhost:5000/api/v1/items/createItem',
        data: sentForm,
        headers: {
          'Content-Type': 'multipart/form-data; boundary=' + sentForm._boundary,
          Authorization: `Bearer ${retrievedToken}`,
        },
      });
      Swal.fire({
        position: 'top',
        toast: true,
        icon: 'success',
        title: 'Created listing successfully!',
        showConfirmButton: false,
        timer: 3000,
      });
      clearInputAfterSubmit();
    } catch (error) {
      let errorMessage =
        error.response.data.message ||
        'Something went wrong! Please try again.';
      Swal.fire({
        position: 'top',
        icon: 'error',
        toast: true,
        title: errorMessage,
        showConfirmButton: false,
        timer: 4000,
        color: '#ff3333',
      });
    }
  };

  return (
    <div className={styles['create-listing-box']}>
      <header className={styles['settings-header']}>Item for Sale</header>
      <div className={styles['item-form-box']}>
        <div className={styles['item-photo-upload-box']}>
          {previewImage ? (
            <img
              src={previewImageURL}
              alt="item-preview"
              className={styles['preview-image']}
            />
          ) : (
            <EmptyPreviewBox />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className={styles['upload-button']}
            ref={itemImageInputRef}
          />
        </div>
        <div className={styles['item-description-form-box']}>
          <form className={styles['item-description-form']}>
            <div className={styles['input-field']}>
              <label htmlFor="itemName" className={styles['label']}>
                Title
              </label>
              <input
                required
                type="text"
                name="itemName"
                className={styles.input}
                ref={itemNameInputRef}
              />
            </div>
            <div className={styles['input-field']}>
              <label htmlFor="itemPrice" className={styles['label']}>
                Price (USD)
              </label>
              <input
                required
                type="number"
                name="itemPrice"
                className={styles.input}
                ref={itemPriceInputRef}
              />
            </div>
            <div className={styles['input-field']}>
              <label htmlFor="itemAvailability" className={styles['label']}>
                Availablity
              </label>
              <input
                required
                type="number"
                name="itemAvailability"
                className={styles.input}
                placeholder="put a number of your item stock"
                ref={itemStockNumberInputRef}
              />
            </div>
            <div className={styles['input-field']}>
              <label htmlFor="itemCategory" className={styles['label']}>
                Categories
              </label>
              <select
                className={styles['category-dropdown']}
                name="itemCategory"
                id="category"
                ref={itemCategoryInputRef}
              >
                <option value="javascript">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="beautyPersonalCare">
                  Beauty & Personal Care
                </option>
                <option value="fashion">Fashion</option>
                <option value="sportOutdoor">Sport & Outdoor</option>
                <option value="tools">Tools</option>
                <option value="petSupplies">Pet Supplies</option>
              </select>
            </div>
            <div className={styles['input-field']}>
              <label htmlFor="itemDescription" className={styles['label']}>
                Item Description
              </label>
              <textarea
                required
                type="text"
                name="itemDescription"
                className={styles['input-description']}
                ref={itemDescriptionInputRef}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
      <div className={styles['action-button']}>
        <GenericButton text="Create Listing" onClick={createListingHandler} />
      </div>
    </div>
  );
};

export default CreateNewListing;
