import csv
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import zipfile
from pathlib import Path
import utils

from IPython.display import display, Latex, Markdown

laco = pd.read_csv('IEN_LACO_Detector.csv')
laco.to_csv('out.csv')