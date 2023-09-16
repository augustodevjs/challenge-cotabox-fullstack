<template>
  <div class="item">
    <div>
      <h3>
        First Name:
        <slot name="firstName"></slot>
      </h3>
      <div class="info-user">
        <div>
          Last Name:
          <slot name="lastName"></slot>
        </div>
        <div>
          Participation:
          <slot name="participation"></slot>
          times
        </div>
      </div>
    </div>

    <div class="details-handle-icons">
      <img alt="edit" src="../../assets/edit-icon.svg" />
      <img alt="delete" src="../../assets/trash-icon.svg" />
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
  width: 800px;
  margin: 0 auto;
  justify-content: space-between;
  background: #fff;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
}

.info-user div {
  color: #a0a0a0;
  font-size: 1rem;
  font-weight: 400;
}

.details-handle-icons {
  display: flex;
  gap: 0.5rem;
}

.details-handle-icons img {
  cursor: pointer;
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
}

@media (max-width: 880px) {
  .item {
    width: 100%;
  }
}
</style>
