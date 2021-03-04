<span style="font-size: 50px">👨‍🌾🌾</span>

# Harvest UI

Harvest is a data visualization web app that communicates with Pixar's Tactor render farm system to display useful statistics for CG production tracking.

## Installation

First clone the repository and go inside, using SSH

```bash
git clone git@github.com:ArtFXDev/harvest-ui.git && cd harvest-ui
```

or using HTTPS :

```bash
git clone https://github.com/ArtFXDev/harvest-ui.git && cd harvest-ui
```



Install npm dependencies with :

```bash
npm install
```

**-> If it doesn't work, try with the `--legacy-peer-deps` option.**

To update the dependencies, use : 

```
npm update 
```
(Same rule as above if it doesn't work)

## Usage

To start the development server : 

```bash
npm run start
```

To build the production optimized app into a `build` folder :

```bash
npm run build
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
