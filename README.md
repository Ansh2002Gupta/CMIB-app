# React frontend

### File structure

> **android**
>
> > Holds all the files needed to create build for android

> **ios**
>
> > Holds all the files needed to create build for ios

> **public**
>
> > It holds all the images needed for the project

> **src**

> > - _controllers_
> >
> > > it contain global controlles

> > - _images_
> >
> > > contains two files :
> > >
> > > > - _index.js_ - Register all images for react in this file
> > > > - _index.native.js_ - Register all images use for react-native

> > - _modules_
> >
> > > it holds all the modules needed for the project. Inside modules the file structure goes as follows:
> > >
> > > > - <your module name>
> > > >   > - _apis_
> > > >   >> holds all the APIs needed in this module
> > > >   > - _controllers_
> > > >   >> contains all the controlles neede in the module
> > > >   > - _layouts_
> > > >   >> holds all the forms layout
> > > >   > - _views_
> > > >   >> holds all the views

> > - _npms_
> >
> > > holds all the global npms needed for the project

> > - _routes_
> >
> > > holds all the routes needed for the project

> > - _theme_
> >
> > > holds all theme and style of the project


**npmsClone.sh** - file is to take the clone of unthinkable components
      in the `src/npms` folder. Use this command to run this folder ```sh npmsClone.sh```.

**Installation & Troubleshooting**
1. Clone unthinkable packages ```sh npmsClone.sh```
1. Install packages ```npm install```

For web, use ```npm run web``` incase of error run ```FAST_REFRESH=false npm run web```

For native, use react native command ```npx react-native run-<android|ios>```