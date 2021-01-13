<script lang="ts">
  import { labelKeys, labelColors } from '../constants';
  import { annotations, Label } from '../store';
  const labelNames = Object.values(Label);
</script>

<style>
  
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

</style>

<div class="labeller">
  <h2>Labels</h2>
  
  {#each labelNames as labelName, index}
    <div class="label" style="color: var(--{labelColors[labelName]}); background-color: var(--{labelColors[labelName]}-light); ">
      <span class="key">{labelKeys[labelName]}</span> 
      <p>{labelName} <span class="color">{labelColors[labelName]}</span></p>
    </div>
  {/each}
</div>
