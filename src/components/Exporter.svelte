<script lang="ts">
  import { annotations } from '../store';

  let exportString = '';
	annotations.subscribe(value => {
    const cleaned = []
    value.forEach((annotation) => {
      cleaned.push({
        start: annotation.start,
        end: annotation.end,
        text: annotation.text,
        label: annotation.label,
      })
    })
    exportString = JSON.stringify(cleaned, null, 2)
	});

</script>

<section>
  <h2>Export data</h2>
  <textarea value="{exportString}"/>
</section>

<style>

  section {
    height: 400px;
  }
  textarea {
    width: 100%;
    height: 100%;
  }
</style>