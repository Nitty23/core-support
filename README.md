# CORE Support
The Official Documentation site for CORE, providing tutorials and guidance on the latest CORE application

## Requirements

* [gruntjs](http://gruntjs.com/) - Run task associated with this project.
* [Sass](http://sass-lang.com/install) - Generates CSS.
* [jekyll](http://jekyllrb.com/) - Run jekyll associated tasks.
* [foundation](https://foundation.zurb.com) - UI Framework library.
* [sjs](https://github.com/christian-fei/Simple-Jekyll-Search) - Search Algorithm.

## Initial Local Installation

```
git clone https://github.com/armydotmil/core-support.git
cd core-support
git checkout develop
git submodule add https://github.com/armydotmil/armydotmil.github.io.git
git submodule initgit submodule update --recursive
bundle install
npm install
bundle exec jekyll serve
```

## Usage
0. To run the local project:
```
bundle exec jekyll serve
```
0. Access the site locally at http://127.0.0.1:4000/

## Updating Content

0. Ensure you're in the 'develop' Branch.
0. Refer to the yaml content guide located in the _data folder of the repository.
0. Save changes to the repo with the following steps in the terminal:
```
git add -A
git commit -m "a short, but to the point, relevant message here"
git pull origin develop
git push origin develop
```

Installation docs - http://jekyllrb.com/docs/installation/
Dev site at: https://static.ardev.us/core/support/
Stagin at: https://www.ahp.us.army.mil/core/support/
Live site at: https://www.army.mil/core/support/

:nerd_face:
