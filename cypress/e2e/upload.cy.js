describe('Upload the Video', () => {
  beforeEach(() => {
    // before each test visit
    cy.visit('http://localhost:3000');
  });

  it('loads the homepage successfully', () => {
    //check that the title appears
    cy.contains('Video Transcription App').should('be.visible')

    // Verify the upload exists
    cy.get('form#upload-form').should('exist')

  });

  it('shows an error when submitting whitout selecting a file', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Please select a file.').should('be.visible')
  });

  it('upload a file successfully ', () => {
    cy.get('input[type="file"]').attachFile('test-video.mp4')
    cy.get('button[type="submit"]').click()
    cy.contains('File uploaded successfully', {timeout : 2000 }).should('be.visible')
  });

})