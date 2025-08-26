const syncCollectionCart = async (): Promise<void> => {
  const collectionContainerEl = document.querySelector<HTMLDivElement>('[data-collection-container]');
  if (!collectionContainerEl) return;

  const getCollectionMarkup = async (): Promise<string | null> => {
    const collectionSection = `${window.location.origin}/collections/${collectionContainerEl.dataset.collectionContainer}?section_id=main-collection`;
    try {
      const collectionMarkup = await fetch(collectionSection);
      if (!collectionMarkup.ok) throw new Error(`HTTP error! status: ${collectionMarkup.status}`);
      return await collectionMarkup.text();
    } catch (e) {
      console.error('Failed to fetch collection:', e);
      return null;
    }
  };

  const htmlText = await getCollectionMarkup();
  const parser = new DOMParser();
  const doc = parser.parseFromString(String(htmlText), 'text/html');
  const collectionNewMarkup = doc.querySelector('[data-collection-container]');
  if (collectionNewMarkup) {
    collectionContainerEl.innerHTML = collectionNewMarkup.innerHTML;
  }
};

export default syncCollectionCart;
