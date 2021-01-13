<script lang="ts">
  
  import { annotations, Label } from '../store';

  const labelNames = Object.values(Label);

  const labelKeys = {}
  labelKeys[Label.Location] = 'L'
  labelKeys[Label.Misc] = 'M'
  labelKeys[Label.Person] = 'P'
  labelKeys[Label.Organisation] = 'O'

  const labelColors = {}
  labelColors[Label.Location] = 'Lavendar'
  labelColors[Label.Misc] = 'Mint'
  labelColors[Label.Person] = 'Pink'
  labelColors[Label.Organisation] = 'Orange'
</script>

<style>

  :root {
    --lavendar:#392bb0;
    --lavendar-light:#dad5ff;
    --orange:#d37912;
    --orange-light:#ffe9d5;
    --pink:#a52bb0;
    --pink-light:#f7d5ff;
    --mint:#41b02b;
    --mint-light:#e6ffd5;
  }
  .labeller {
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: repeat(64px);
    grid-gap: 12px;
  }

  .label {
    font-size: 16pt;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 64px auto; 
    grid-gap: 12px;
  }

  .key {
    display: grid;
    align-items: center;
    justify-items: center;
    font-weight: 600;
    border-radius: 4px;
    border: 2px solid grey;
    margin: 12px;
  }
  .label p {
    text-transform: capitalize;
    text-align: left;
  }

  .label .color {
    text-transform: uppercase;
    font-size: 10pt;
    line-height: 10pt;
    font-weight: 400;
    padding: 0px 3px 2px 3px;
    border-radius: 3px;
    opacity: 0.3;
  }

  /* Globals as these classes are created dynamically */
  :global(.label.location) {
    color: var(--lavendar);
    background-color: var(--lavendar-light);
  }

  :global(.label.location .color) {
    color: var(--lavendar-light);
    background-color: var(--lavendar);
  }
  
  :global(.label.organization) {
    color: var(--orange);
    background-color: var(--orange-light);
  }

  :global(.label.organization .color) {
    color: var(--orange-light);
    background-color: var(--orange);
  }

  :global(.label.person) {
    color: var(--pink);
    background-color: var(--pink-light);
  }

  :global(.label.person .color) {
    color: var(--pink-light);
    background-color: var(--pink);
  }

  :global(.label.misc) {
    color: var(--mint);
    background-color: var(--mint-light);
  }

  :global(.label.misc .color) {
    color: var(--mint-light);
    background-color: var(--mint);
  }

</style>

<div class="labeller">
  <h2>Labels</h2>
  <p>Select the text you'd like to annotate, and press one of the keys below to annotate it</p>
  {#each labelNames as labelName, index}
    <div class="label {labelName}">
      <span class="key">{labelKeys[labelName]}</span> 
      <p>{labelName} <span class="color">{labelColors[labelName]}</span></p>
    </div>
  {/each}
</div>
