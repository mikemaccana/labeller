<script lang="ts">
  import { annotations, Label, text } from '../store';
  import type {Annotation} from '../store';
  import { labelColors } from '../constants';
  import { onMount } from 'svelte';
  const log = console.log.bind(console)

  let isTextSelected = false

  let selectionStart
  let selectionEnd
  let selectedText
  let highlightRectangles: any[];

  const VALID_KEYS = ['Escape', 'KeyO', 'KeyP', 'KeyL', 'KeyM']

  const LABELS_FOR_KEYS = {
    'KeyO': Label.Organisation, 
    'KeyP': Label.Person,  
    'KeyL': Label.Location,  
    'KeyM': Label.Misc, 
  }

  // UI offsets for highlights
  let X_OFFSET = 0; 
  let Y_OFFSET = 0; 
  onMount(() => {
    // Oddly enough, individual DOM Range items have getClientRects() for absolute coordinates,
    // which handles ranges that span multiple lines, and getBoundingClientRect() for relative 
    // coordinates that span a single line - but nothing for relative coordinates
    // that span multiple lines!
    // So let's offset everything, so highlights are in the correct position 
    const articlePosition = document.querySelector('article').getBoundingClientRect()
    X_OFFSET = Math.round(articlePosition.x)
    Y_OFFSET = Math.round(articlePosition.y)
  });

  // Give highlights a little extra room at the top
  const ROOM_FOR_LABEL = 6;

  function clearSelection(){
    window.getSelection().empty()
      isTextSelected = false
  }

  function updateSelection(event){
    // https://developer.mozilla.org/en-US/docs/Web/API/Selection
    const selection = window.getSelection()

    if ( selection.isCollapsed ) {
      // Nothing is highlighted
      isTextSelected = false
      return
    }

    selectedText = selection.toString()
    if (selectedText.endsWith(' ') ) {
      // Selection by clicking will always be 'word ' 
      // so let's modify the selection so it's 'word'
      // See https://developer.mozilla.org/en-US/docs/Web/API/Selection/modify
      // Note this is non-standard
      // hence the...
      // @ts-ignore
      selection.modify('extend', 'backward', 'character');
      selectedText = selection.toString()
    }

    isTextSelected = true

    // the anchor is placed where you pressed the mouse button, 
    // and the focus is placed where you released the mouse button.
    // Focus can be before anchor (if we select backwards from cursor)
    const start = Math.min(selection.anchorOffset, selection.focusOffset)
    const end = Math.max(selection.anchorOffset, selection.focusOffset)
    selectionStart = start
    selectionEnd = end
    

    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createRange
    const parentElement = selection.anchorNode
    const range = document.createRange();
    range.setStart(parentElement, start);
    range.setEnd(parentElement, end);
    // These rects contain the client coordinates in top, left
    const rects = range.getClientRects();
    // Convert to an array instead of DOMRectList
    highlightRectangles = [...rects]
    log(`highlightRectangles are`, highlightRectangles)
  }

  function deleteAnnotation(index: number){
    log(`Deleting annotation ${index}`)
    annotations.update((currentValue) => {
      currentValue.splice(index, 1)
      return currentValue;
    })
  }

  document.addEventListener('keyup', function(event){
    const key = event.code
    if ( ! VALID_KEYS.includes(key) ) {
      log(`Invalid key, ignoring`)
      return
    }

    if ( ! isTextSelected ) {
      log(`No text is selected`)
      return
    }

    if ( key === 'Escape') {
      clearSelection()
    }

    const annotation: Annotation = {
      start: selectionStart,
      end: selectionEnd,
      text: selectedText,
      label: LABELS_FOR_KEYS[key],
      _highLightPositions: []
    }

    highlightRectangles.forEach((highlightRectangle) => {
      annotation._highLightPositions = [...annotation._highLightPositions, {
        // https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
        top: Math.round(highlightRectangle.top),
        bottom: Math.round(highlightRectangle.bottom),
        width: Math.round(highlightRectangle.width),
        height: Math.round(highlightRectangle.height),
        left: Math.round(highlightRectangle.left),
        right: Math.round(highlightRectangle.right),
      }]
    })

    log(`Key ${key} was pressed and text is selected. Created annotation...`, annotation)

    // Push new annotation to the annotation store
    annotations.update((currentAnnotations) => {
      return [...currentAnnotations, annotation]
    })

    clearSelection()
  })
  
  
</script>

<style>
  /* Stolen from medium.com */
  article {
    font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
    position: relative;
  }

  p.text { 
    color: rgba(41, 41, 41, 1);
    word-break: break-word;
    margin-bottom: -0.46em;
    letter-spacing: -0.003em;
    font-size: 21px;
    margin-top: 2em;
    line-height: 32px;
  }
  .annotation {
    /* https://css-tricks.com/basics-css-blend-modes/ */
    mix-blend-mode: multiply;
    /* Make highlight slightly bigger than words */
    transform: scale(1.03);
    border-radius: 4px;
    overflow: hidden;
  }

  .annotation button {
    line-height: 10px; 
    font-size: 10px;
    height: 10px;
    width: 10px;
    margin: 0;
    padding: 0 0 1px 0;
    background-color: transparent;
    position: absolute;
    right: 0;
    top: 0;
    display: grid;
    justify-content: center;
    align-content: center;
    border: none;
  }

  .annotation label {
    text-transform: uppercase;
    position: absolute;
    left: 2px;
    top: -1px;
    font-size: 8px;
    font-family: var(--ui-font);
    font-weight: bold;
    text-overflow: ellipsis;
  }
  
</style>

<section class="instructions-and-document">
  <p>Use the mouse to select text to annotate, and press one of these keys to label it</p>
  <article on:mouseup={updateSelection}>
    <p class="text">{text}</p>
    {#each $annotations as annotation, annotationIndex}
      {#each annotation._highLightPositions as highlightPosition}
        <div class="annotation" style="
          position: absolute; 
          top: {highlightPosition.top - Y_OFFSET - ROOM_FOR_LABEL}px; 
          left: {highlightPosition.left - X_OFFSET}px; 
          width: {highlightPosition.width}px; 
          height: {highlightPosition.height + ROOM_FOR_LABEL}px; 
          color: var(--{labelColors[annotation.label]}); 
          background-color: var(--{labelColors[annotation.label]}-light); 
        "
        >
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label style="color: var(--{labelColors[annotation.label]}); ">{annotation.label}</label>
          <button style="background-color: var(--{labelColors[annotation.label]}-light);" on:click={() => deleteAnnotation(annotationIndex)}>×</button>

        </div>
      {/each}
    {/each}
  </article>
</section>
