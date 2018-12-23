##WAVI_M Web Application Viewer 2 (Node.js)

Generate a svg class diagram for your node.js web application.

WAVI is intended for developers who wish to document their web application or as a reverse engineering tool to recover 
the structure of a web application.  This (WAVI_M) is a modified version, whose goal is to make the svg files more readable for large diagrams, 
and when examining large directories,  while providing additional options.  In order to accomplish this, some modifications are proposed:

-  Remove CSS elements from diagrams
-  Allow limits to be set on directory recursion
-  Allow the option to reverse-engineer single or selected files, no matter their placement on the directory tree
-  Allow option to examine to remove functions from UML diagrams.  Useful when wanting to look at how only the files and classes 
   are interconnected

Additional options in the future:

-  Attach a new front end that will move away from svg files, and allow the adjustment of UML diagrams post-creation

Additional suggestions, or changes to these suggestions, are welcome!

(From the original README)
Web applications pose unique challenges when it comes to understanding and maintaining their heterogeneous structures, which often involve complex interactions between elements from different languages. Accurate and up-to-date documentation is rarely available and this calls for the proposal of reverse engineering approaches for the recovery and representation of such structures. The proposed package presents our ongoing work on Web Application Viewer (WAVI), a tool able to reverse engineer a web application's structure.


## Usage in your terminal (CLI): 

The first argument is the path to the website to be analyzed and the second argument is the path where the svg graph will be generated.

wavi path/to/website path/to/resultfile/graph.svg

Example:

```
wavi website/example result/example.svg

```

## In Ubuntu: 

Make sure you add /usr/local/bin to your environment variable PATH or use absolute path to wavi.
If you use nodejs instead of node you will get this error:

```
"node\r": No such file or directory
```

You can run wavi this way using nodejs keyword and you can also use the absolute path to wavi:

    $ nodejs /usr/local/bin/wavi /path/to/website graph.svg


## Example:

![Example](/es5/example/graph.jpg?raw=true "Example")


[More at the wavi blog](https://blogwavi.wordpress.com/)




## License

The MIT License (MIT)
Copyright (c) 2014 Bakunin95
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
