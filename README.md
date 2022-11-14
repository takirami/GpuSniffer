# GpuSniffer
Node application that looks for available nvidia 3060, 3060ti, 3070 and 3070ti graphics cards from Verkkokauppa.com, Jimms.fi, Datatronic.fi and Proshop.fi.

This app lists all products that are in the specified price range, separated as 3060 and 3070 cards. Results are organized and color coded by relative price in the given range.

### Info shown
- Price in €
- Name and Brand
- Name of store
- Link to product page


## Installation
To install dependencies, just run yarn in product root.
```bash
yarn
```

#### If you are using WSL
Note that you need something like xLaunch installed and running for the app to find a browser to do the scrape in.

## Usage
#### Basic fetch 
Defaults to max price 1000€
```bash
node fetch
```

#### Parameters
To define a new max range
```bash
node fetch --max=750
```

To only show 12GB cards
```bash
node fetch --twelve
```
