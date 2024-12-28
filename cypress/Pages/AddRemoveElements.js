class AddRemoveElements {
  NAMES = {
    contentText: "Add/Remove Elements",
    linkName: "add_remove_elements/",
    addElement: "Add Element",
    deleteARE: "Delete",
    loopCount:20,
  };

  getDeleteButton(){
    return cy.get('.added-manually')
  }
  
}

export const addRemoveElements = new AddRemoveElements();