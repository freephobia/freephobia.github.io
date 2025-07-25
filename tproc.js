const XMLFILEURL_ORI0="haerlib.xml";
fetch(XMLFILEURL_ORI0)
   .then(response => response.text())
   .then(data => {
        const parser = new DOMParser();
        let xmlDoc0 = parser.parseFromString(data, 'application/xml');
        window.globalXmlDom=xmlDoc0;
    })
    .catch(error => console.error('[Error] Failed to load the XML file:', error));