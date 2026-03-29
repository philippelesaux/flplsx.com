## ADDED Requirements

### Requirement: initGallery factory is exported from src/scripts/gallery.ts
`src/scripts/gallery.ts` SHALL export a named function `initGallery(gridEl: HTMLElement, dialog: HTMLDialogElement): () => void`. Both parameters SHALL be passed in from the call site — the module SHALL NOT query `document` internally. The `dialog` parameter is required separately because the photo dialog is a DOM sibling of the grid, not a descendant. The function SHALL return a teardown function.

#### Scenario: Module exports initGallery
- **WHEN** `src/scripts/gallery.ts` is imported
- **THEN** a named export `initGallery` is available with signature `(gridEl: HTMLElement, dialog: HTMLDialogElement): () => void`

### Requirement: PhotoGallery.astro script block is a minimal factory call
`PhotoGallery.astro`'s `<script>` block SHALL contain only the import of `initGallery` and a single call passing the gallery root element. No dialog, navigation, or animation logic SHALL remain inline.

#### Scenario: Script block contains no logic
- **WHEN** `PhotoGallery.astro`'s `<script>` block is read
- **THEN** it contains only an import statement and one `initGallery(...)` call

### Requirement: Dialog opens with correct image on thumbnail click
When a thumbnail button is clicked, the photo dialog SHALL open displaying the image, title, and location associated with that thumbnail's data attributes.

#### Scenario: Dialog opens with correct image
- **WHEN** a thumbnail button is clicked
- **THEN** the dialog becomes open
- **THEN** the dialog image `src` matches the button's `data-display` attribute
- **THEN** the dialog title text matches the button's `data-title` attribute
- **THEN** the dialog location text matches the button's `data-location` attribute

### Requirement: Dialog navigation moves between images
The prev and next buttons SHALL cycle through images in order. Navigation SHALL wrap from last to first and first to last.

#### Scenario: Next button advances to next image
- **WHEN** the dialog is open on image N and the next button is clicked
- **THEN** the dialog displays image N+1

#### Scenario: Prev button moves to previous image
- **WHEN** the dialog is open on image N and the prev button is clicked
- **THEN** the dialog displays image N-1

#### Scenario: Navigation wraps at boundaries
- **WHEN** the dialog is on the last image and next is clicked
- **THEN** the dialog displays the first image
- **WHEN** the dialog is on the first image and prev is clicked
- **THEN** the dialog displays the last image

### Requirement: Keyboard arrow keys navigate the dialog
While the dialog is open, pressing ArrowLeft SHALL navigate to the previous image and ArrowRight to the next.

#### Scenario: ArrowRight navigates forward
- **WHEN** the dialog is open and ArrowRight is pressed
- **THEN** the dialog advances to the next image

#### Scenario: ArrowLeft navigates backward
- **WHEN** the dialog is open and ArrowLeft is pressed
- **THEN** the dialog moves to the previous image

### Requirement: Dialog closes via close button or backdrop click
The close button SHALL close the dialog. Clicking the dialog backdrop (the dialog element itself, outside the content) SHALL also close it.

#### Scenario: Close button closes dialog
- **WHEN** the close button is clicked
- **THEN** the dialog is closed

#### Scenario: Backdrop click closes dialog
- **WHEN** the dialog element itself is clicked (not its children)
- **THEN** the dialog is closed

### Requirement: Thumbnail entrance animations trigger on scroll into view
Each thumbnail image SHALL be hidden initially and gain class `visible` when it enters the viewport via IntersectionObserver. The transition delay SHALL be removed after the animation fires.

#### Scenario: Image gains visible class when intersecting
- **WHEN** a thumbnail image enters the viewport
- **THEN** the image gains class `visible`

#### Scenario: Observer stops watching after first intersection
- **WHEN** a thumbnail image has become visible
- **THEN** the IntersectionObserver stops observing that image
