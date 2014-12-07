from __future__ import print_function

import os

files_to_replace = []
replace = {"beer":"pizza",
           "Beer":"Pizza",
           "alcohol":"note",
           "strongAlcohol":"betterNote"}

for root, dirs, files in os.walk("."):
    for file_ in files:
        files_to_replace.append(os.path.join(root, file_))

for file_ in files_to_replace:
    if (len(file_.split("replaceInAll.py"))>1):
        continue
    print(file_)
    r=open(file_)
    lines  = r.readlines()
    r.close()
    newlines = []
    w = open(file_, "w")
    for line in lines:
        for rep in replace.keys():
            line = line.replace(rep,replace[rep])
        w.write(line)
    w.close()
    
