import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";


const Header = () => {
  // todo: user login info related visibility control; screen width related control
  return (
    <header className="flex justify-center h-16 border-1 p-4">
      <div className="flex items-center gap-2 w-5xl">
        <a href="/" className="text-3xl font-black">URL Shortener</a>
        <NavigationMenu className="ml-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#" className="font-medium">Home</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#" className="font-medium hover:">URLs</a>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#" className="font-medium hover:">Sign Up</a>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#" className="font-medium hover:">Log In</a>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#" className="font-medium hover:">Log Out</a>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
        <h4 className="text-sm font-medium italic">Hi, Shaobo</h4>
      </div>
    </header>
  );
};

export default Header;