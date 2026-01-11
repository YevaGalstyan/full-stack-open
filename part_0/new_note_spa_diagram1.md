```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    
    activate server
    server-->>browser: Request Response containing a success message

    Note right of browser: Browser executes eventHandler callback function to update Notes list
```