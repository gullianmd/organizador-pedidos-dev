


class ElementBuilder {

  builder (type, innerText = null, atributes = null, callBack = null) {

    // Filtrado de parametros

    if (
      typeof(type) != "string" ||
      innerText != null && typeof(innerText) != "string" ||
      atributes != null && typeof(atributes) != "object" ||
      callBack != null && typeof(callBack) != "function"
      ) {
        return null
      }


    // construccion de componentes

    // Creando el componente
    const baseElement = document.createElement(type);
    
    // añadiendo texto si se requiere
    if (innerText != null) baseElement.innerText = innerText;

    // creando atributos si se requiere
    if (atributes != null && Object.keys(atributes).length > 0) {

      const keys = Object.keys(atributes);

      for (let i = 0; i < Object.keys(atributes).length; i++) {

        baseElement.setAttribute(keys[i], atributes[keys[i]])

      }

    }

    // Añadiendo funciones si se requiere

    if(callBack != null) {

      baseElement.onclick = callBack


    }


    return baseElement;

  }

  domInyector (element, elementId) {


    try {

      element instanceof HTMLElement;

    } catch (e) {

      return e
    }

    
    const targetElement = document.getElementById(elementId)

    targetElement.append(element)

  }

}

class OrganizadorElements extends ElementBuilder {

  boton() {

    return this.builder(
      "button",
      "ClickMe!",
      null,
      function(){console.log("holi")}
    )

  }

}



const organizadorElements = new OrganizadorElements()


// despues de 1 segundo se crea un componennte y se inyecta al div con el id zone1

setTimeout(() => {

  organizadorElements.domInyector(organizadorElements.boton(), "zone1");

}, 1000)


