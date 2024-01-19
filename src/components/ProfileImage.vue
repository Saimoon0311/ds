<template>
    <div class="d-flex">
        <div>
          <form
            @submit.prevent="uploadImage"
          >
            <label for="photo">Photo:</label>
            <input
              type="file"
              id="photo"
              name="profile_picture"
              class="form-control"
              accept="image/*"
              ref="fileInput"
              required
            />
            <input
              type="submit"
              class="btn btn-dark mt-2"
              name="photo-submit"
              value="Upload"
            />
          </form>
          
        </div>
      </div>
</template>
<script></script>
<style></style>