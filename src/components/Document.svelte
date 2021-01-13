<script lang="ts">
  import { annotations, Label, text } from '../store';
  import type {Annotation} from '../store';
  import { labelColors } from '../constants';
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

  const COLORS_FOR_KEYS = {}
  COLORS_FOR_KEYS[Label.Organisation] = ''

  let highlights: Annotation[];
	annotations.subscribe(value => {
		highlights = value;
	});

  function clearSelection(){
    window.getSelection().empty()
      isTextSelected = false
  }

  function updateSelection(event){
    // https://developer.mozilla.org/en-US/docs/Web/API/Selection
    const selection = window.getSelection()

    isTextSelected = true

    // Focus can be before anchor (if we select backwards from cursor)
    const start = Math.min(selection.anchorOffset, selection.focusOffset)
    const end = Math.max(selection.anchorOffset, selection.focusOffset)
    selectionStart = start
    selectionEnd = end
    selectedText = selection.toString()

    // https://stackoverflow.com/questions/5143534/how-to-get-the-position-of-text-within-an-element
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
      annotation._highLightPositions = [...highlightRectangles, {
        // https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
        top: Math.round(highlightRectangle.top),
        bottom: Math.round(highlightRectangle.bottom),
        width: Math.round(highlightRectangle.width),
        height: Math.round(highlightRectangle.height),
        left: Math.round(highlightRectangle.left),
        right: Math.round(highlightRectangle.right),
      }]
    })

    log(`Key ${key} was pressed and text is selected. Create annotation...`, annotation)

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

  :global(.annotation) {
    /* https://css-tricks.com/basics-css-blend-modes/ */
    mix-blend-mode: multiply;
  }
  
</style>

<section class="instructions-and-document">
  <p>Use the mouse to select text to annotate, and press one of these keys to label it</p>
  <article on:mouseup={updateSelection}>
    <p class="text">{text}</p>
    {#each highlights as highlight, index}
      {#each highlight._highLightPositions as highlightPosition, index}
        <div class="annotation" style="
          position: absolute; 
          top: {highlightPosition.top - 95}px; 
          left: {highlightPosition.left - 163}px; 
          width: {highlightPosition.width}px; 
          height: {highlightPosition.height}px; 
          color: var(--{labelColors[highlight.label]}); 
          background-color: var(--{labelColors[highlight.label]}-light); 
        ">

        </div>
      {/each}
    {/each}
  </article>
</section>
