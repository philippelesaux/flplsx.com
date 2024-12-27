export async function getAlbumImages(albumId: string) {
    let allImages = import.meta.glob<{ default: ImageMetadata }>(
        "/src/content/albums/**/*.{jpg,jpeg}"
    );

    // We need to convert the Record into a real object, hence all the Object.blah nonsense
    let filteredImages = Object.fromEntries(
        // Convert allImages into an array with each entry being an array itself containing the key and value ([[key, value]])
        Object.entries(allImages)
            // Filter down to only the entries from the specified albumId
            .filter(([key]) =>
                key.includes(albumId)
            )
    );

    // Return a promise for each image
    return await Promise.all(
        Object.values(filteredImages).map((image) =>
            image().then((mod) => mod.default)
        )
    );
}