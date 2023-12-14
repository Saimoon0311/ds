<template>
<div
        class="border rounded bg-secondary text-white p-3 text-start col-md-7 m-auto mt-3"
        id="28"
      >
        <div>
          <p class="badge bg-dark" title="Area">{{ jobData?.field?.title }}</p>
          &nbsp;
          <p class="badge bg-dark" title="Location">
            {{ jobData?.location?.title }}
          </p>
          <p class="text-center mt-3 mb-2">
            <b>{{ jobData?.title }}</b>
          </p>
          <p id="description28" class="cardProposalDes">
            {{ jobData?.description }}
          </p>
          <button
            :disabled="!jobData?.requirement"
            type="button"
            class="btn btn-dark btn-sm custom-pad"
            :data-target="`.edit-job-title-modal${index}`"
            title="Edit"
            :data-bs-toggle="`modal${index}`"
            data-bs-target="#Accessibility"
            @click="openRequirementsModal(jobData?.requirement)"
          >
            Accessibility Requirements
          </button>
          <span class="spacer">
            <p class="smallFont">
              Posted by {{ jobData?.owner?.first_name }} {{ jobData?.owner?.last_name }}
              <span class="text-capitalize">({{ jobData?.city }})</span>
              on {{ formatCreatedAt(jobData?.created_at) }}
            </p>
            <p span class="smallFont">Job No: {{ jobData?.identity }}</p>
          </span>
          <div>
          </div>
        </div>
      </div>
</template>

<script>

export default {
    props:['jobData']
}

</script>