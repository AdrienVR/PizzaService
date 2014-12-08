from __future__ import print_function

import os

files_to_replace = []
replace = {"availability":"price",
           "Availability":"Price"}

for root, dirs, files in os.walk("."):
    for file_ in files:
        files_to_replace.append(os.path.join(root, file_))

for file_ in files_to_replace:
    modified = False
    if (len(file_.split("replaceInAll.py"))>1):
        continue
    print(file_)
    r=open(file_)
    lines  = r.readlines()
    r.close()
    newlines = []
    for line in lines:
        avant_line=line
        for rep in replace.keys():
            line = line.replace(rep,replace[rep])
            newlines.append(line)
        if avant_line != line:modified = True

    if modified:
        w = open(file_, "w")
        for line in newlines:
            w.write(line)
        w.close()
    
