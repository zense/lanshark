    $$\      $$\                 $$\ $$\                 $$\   $$\           $$\ 
    $$$\    $$$ |                $$ |\__|                $$ |  $$ |          $$ | 
    $$$$\  $$$$ | $$$$$$\   $$$$$$$ |$$\  $$$$$$\        $$ |  $$ |$$\   $$\ $$$$$$$\ 
    $$\$$\$$ $$ |$$  __$$\ $$  __$$ |$$ | \____$$\       $$$$$$$$ |$$ |  $$ |$$  __$$\ 
    $$ \$$$  $$ |$$$$$$$$ |$$ /  $$ |$$ | $$$$$$$ |      $$  __$$ |$$ |  $$ |$$ |  $$ |
    $$ |\$  /$$ |$$   ____|$$ |  $$ |$$ |$$  __$$ |      $$ |  $$ |$$ |  $$ |$$ |  $$ |
    $$ | \_/ $$ |\$$$$$$$\ \$$$$$$$ |$$ |\$$$$$$$ |      $$ |  $$ |\$$$$$$  |$$$$$$$  |
    \__|     \__| \_______| \_______|\__| \_______|      \__|  \__| \______/ \_______/ 
                                                                                   
                                               
## Installation

1. Clone the repository and move to the project root.
2. Run `bin/lansharkgui`
3. In case of dependency errors, install required packages. Dependencies are:
    * __simplejson__

      To install run `pip install simplejson`
    * __pygtk__

      To install checkout [this link](http://www.pygtk.org/downloads.html).  
      For Mac run `brew install pygtk`.
4. If pygtk is not being imported inspite of being installed add the following into `.bashrc` or `.zshrc`.

   `export PYTHONPATH=/usr/local/lib/python2.7/site-packages:$PYTHONPATH`

   The path in the above command might have to be changed depending on your system's python path.
5. In case an error related to locale is thrown, add the following line to your `.bashrc` or `.zshrc`.

   ```
    export LC_ALL=en_US.UTF-8
    export LANG=en_US.UTF-8
   ```

## Configuration

The GUI automatically shows a graphical configuration interface on the first start.  
If you are using the command line you have to configure lanshark manually before using it. You need to change at least two keys:
  * __SHARE_PATH__: The directory which is shared with others. 
  * __INCOMING_PATH__: The directory where downloaded files are stored.
  
*It is recommended to make the __INCOMING_PATH__ directory a subdirectory of __SHARE_PATH__ so that everything you download with lanshark gets shared again.*

## Config File

* In linux systems the config file is located in `$XDG_CONFIG_HOME/lanshark/config` which points normally to `~/.config/lanshark/config`.
* If you've used the windows installer the config file will be located in your `home` directory and called `lanshark.conf`.
* For the portable windows version the config file is located in the `conf` folder and called `lanshark.conf`.

## Cover Artwork/Custom Icons for Folders

To define a cover/custom icon for a folder call the file folder.png, folder.jpg, cover.jpg etc. You can customize the list of regular expressions used to match the icons in the config file. The config key is called `FolderImages`.
