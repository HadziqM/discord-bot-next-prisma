from download import *
from direc import *
downloading = ["Divine Excalibur", "True Kusanagi-no-Tsurugi", "Flag of the Saint VI", "Fake Projection Spiral VII", "Nameless Dagger(Black) VII", "Nameless Dagger VII", "Ea Black Diverged Sword VII", "Ea Diverged Air Sword VII", "Golden Victory Sword VII", "Kanshou and Bakuya VII", "Sword of Promised Victory VII", "6921 Fate Armor Set01", "221C Fate Armor Set02", "4339 Fate Armor Set03",
               "383A Fate Armor Set04", "393A Fate Armor Set05", "9C2C Fate Armor Set06", "Hiden Stamp Sns x5", "Hiden Stamp DS x5", "Hiden Stamp GS x5", "Hiden Stamp LS x5", "Hiden Stamp Hammer x5", "Hiden Stamp HH x5", "Hiden Stamp Lance x5", "Hiden Stamp GL x5", "Hiden Stamp Swaxe x5", "Hiden Stamp Tonfa x5", "Hiden Stamp MS x5", "Hiden Stamp LBG x5", "Hiden Stamp HBG x5", "Hiden Stamp Bow x5"]
cidall = [2256, 2281, 2297, 2308, 2310, 2309, 2312, 2311, 2313, 2314, 2315, 2316, 2317, 2318, 2319,
          2320, 2321, 2322, 2323, 2324, 2325, 2326, 2327, 2328, 2329, 2330, 2331, 2332, 2333, 2334, 2335]
binn = [i+'.bin' for i in downloading]


length = len(downloading)
down = DownLoad()
for i in range(length):
    down.print(cidall[i], binn[i])
