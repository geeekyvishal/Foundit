// Function to add a new item card to the Lost section
function addLostItem(type, owner, description, imageUrl) {
    const lostSection = document.getElementById('lost-items');
    const newCard = `
      <article class="popular__card swiper-slide">
        <img src="${imageUrl}" alt="" class="popular__img" />
        <div class="popular__data">
          <h2 class="popular__price"><span>TYPE: </span>${type}</h2>
          <h3 class="popular__title"><span>Owner: </span>${owner}</h3>
          <p class="popular__description"><span>Description: </span>${description}</p>
        </div>
      </article>
    `;
    lostSection.innerHTML += newCard;
  }
  
  // Function to add a new item card to the Found section
  function addFoundItem(type, finder, description, imageUrl) {
    const foundSection = document.getElementById('found-items');
    const newCard = `
      <article class="popular__card swiper-slide">
        <img src="${imageUrl}" alt="" class="popular__img" />
        <div class="popular__data">
          <h2 class="popular__price"><span>TYPE: </span>${type}</h2>
          <h3 class="popular__title"><span>Finder: </span>${finder}</h3>
          <p class="popular__description"><span>Description: </span>${description}</p>
        </div>
      </article>
    `;
    foundSection.innerHTML += newCard;
  }
  
  // Example usage
  addLostItem("ID Card", "John Doe", "Lost near the main entrance.", "asset/img/idcard.jpg");
  addFoundItem("Phone", "Jane Doe", "Found in the cafeteria.", "asset/img/phone.jpg");
  