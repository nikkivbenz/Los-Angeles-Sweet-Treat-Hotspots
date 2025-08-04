# Los Angeles Coffee Shop Map

An interactive map showcasing the best coffee shops across Los Angeles with detailed information, ratings, and direct Yelp integration.

## Features

- **Interactive Map**: Click on coffee cup markers to see detailed information
- **Sidebar List**: Browse all coffee shops in a scrollable list
- **Bidirectional Interaction**: Click map markers or sidebar items to view details
- **Yelp Integration**: Direct links to Yelp pages for reviews and more info
- **Responsive Design**: Split-screen layout optimized for desktop viewing

## How to Use

### Option 1: Local HTTP Server (Recommended)
Due to browser security restrictions, you need to run a local server to load the CSV data:

1. **Using Python (if installed)**:
   ```bash
   cd /path/to/Los-Angeles-Sweet-Treat-Hotspots
   python -m http.server 8000
   ```
   Then open: http://localhost:8000

2. **Using Node.js (if installed)**:
   ```bash
   cd /path/to/Los-Angeles-Sweet-Treat-Hotspots
   npx http-server
   ```

3. **Using VS Code Live Server**: Install the Live Server extension and right-click `index.html` → "Open with Live Server"

### Option 2: Direct File Access
Simply open `index.html` in your browser, but CSV loading may be blocked by CORS policy.

### Using the Website
1. **Browse coffee shops**: Scroll through the sidebar list or explore the map
2. **Get details**: Click on any coffee shop (map or sidebar) to see:
   - Full address and phone number
   - Yelp rating and specialty
   - Operating hours
   - Direct link to Yelp page

## Adding/Removing Coffee Shops

To modify the coffee shop data:

1. **Open `coffee_shops.csv`** in any text editor or spreadsheet program
2. **Add new coffee shops** by adding a new row with these columns:
   - name: Coffee Shop Name
   - address: Full Address
   - lat: Latitude (decimal format, e.g., 34.0522)
   - lng: Longitude (decimal format, e.g., -118.2437)
   - specialty: What makes it special
   - hours: Operating hours
   - yelp_url: https://www.yelp.com/biz/...
   - phone: (XXX) XXX-XXXX
   - rating: 4.5

3. **Save the CSV file** - changes will be reflected immediately when you refresh the browser

**Example CSV row:**
```
Awesome Coffee,123 Main St Los Angeles CA 90210,34.0522,-118.2437,Great specialty roasts,7:00 AM - 6:00 PM,https://www.yelp.com/biz/awesome-coffee,(323) 555-0123,4.2
```

## Technical Details

- **Map Service**: Leaflet.js (lightweight, open-source mapping library)
- **Data Source**: Dynamic CSV loading for easy management
- **Browser Compatibility**: Works with all modern browsers
- **Server Requirement**: Requires local HTTP server due to CORS restrictions

## Current Coffee Shops (83 locations)

The comprehensive database now includes coffee shops, cafes, boba shops, and specialty tea establishments across all major LA neighborhoods:

### Central LA & Downtown
- Arts District: Blue Bottle, Handsome Coffee, Boxx Coffee, Kumquat, Eightfold
- Little Tokyo: Cafe Dulce, Tea Master
- Chinatown: Endorffeine
- Koreatown: Document Coffee Bar, Spot Coffee & More

### Eastside
- Silver Lake: Dinosaur Coffee, Lamill, Cafe Nido, How's It Going to End
- Los Feliz: Maru Coffee, Menotti's, Pam's Coffy, Dayglow
- Echo Park: Woodcat Coffee, Canyon Coffee, Stereoscope Coffee  
- Highland Park: Kumquat, Civil Coffee, Kindness & Mischief, Modu, Terra Mia
- Eagle Rock: Little Fluffy Head
- Cypress Park: Loquat Coffee

### Westside
- West Hollywood: Alfred, Urth Caffe, Verve, Philz, The Butcher Baker, Gravite
- Beverly Hills: The Maybourne Cafe, Maru Espresso Bar, Boulon Coffee
- Venice: Groundwork, Hooked Venice
- Santa Monica: Layla Bagels
- Culver City: Cognoscenti, Equator Coffees, The Village Well, Latea
- Westwood: Junbi, Upside Down, Espresso Profeta

### San Fernando Valley
- North Hollywood: Horror Vibes Coffee, Cara Vana
- Burbank: Porto's Bakery, Lou The French On The Block
- San Fernando: San Fernando Coffee Company

### South Bay & Beach Cities
- Long Beach: Good Time, Wolf's Brew, The Library Coffee House
- El Segundo: Offset Coffee, Two Guns Espresso
- Redondo Beach: The Boy and the Bear, Klatch Coffee, Roman Aroma Caffe, Coffee Cartel
- Manhattan Beach: Verve Coffee Roasters

### Specialty & Cultural Establishments
- Japanese/Matcha: Tea Master, Junbi, Motto Tea Cafe, Cafe Dulce
- Korean: Document Coffee Bar, Spot Coffee & More
- Vietnamese: Hey Hey
- Mexican: Terra Mia Highland Park
- Taiwanese Boba: Chi Cha San Chen, Wushiland
- Late Night/24-Hour: Spot Coffee & More (until 2 AM), Astro Family Restaurant (24 hours)

### San Gabriel Valley & Pasadena
- Pasadena: Mandarin Coffee Stand, Motto Tea Cafe
- San Gabriel: Chi Cha San Chen, Wushiland

## Future Enhancements

Potential improvements could include:
- Search/filter functionality
- Favorite coffee shops
- User reviews
- Driving directions
- Mobile-responsive design
- Different map tile options