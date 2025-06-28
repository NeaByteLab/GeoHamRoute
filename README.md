# 🚚  GeoHamRoute

🌐  GeoHamRoute is a Node.js courier route planning algorithm that uses Geohash and Hamming Distance to determine the optimal delivery order based on geographic proximity.

---

## ✨  Features

- Calculate Hamming Distance between Geohash strings
- Encode coordinates into Geohash without external dependencies
- Sort delivery points by lowest distance score for optimal routing

---

## ⚙️  Installation

```bash
npm install
```

> Requires Node.js v14 or higher

## 🚀  Usage

1. **Run directly**

   ```bash
   node index.js
   ```

---

## 📘  Algorithm Explanation

1. **Geohash Encoding**
   - Binary partition latitude (–90 to 90) and longitude (–180 to 180).
   - Every 5 bits form one Base32 character.
2. **Hamming Distance**
   - Count differing positions between two equal-length Geohash strings.
3. **Route Planning**
   - Encode the courier location and each delivery point.
   - Compute Hamming Distance score for each point.
   - Sort points by ascending score (closest first).

---

## 🔎  Example Output

```
Optimized Delivery Order:
1. Point10 (-7.1669909266549645, 112.78773312146227)
2. Point46 (-7.167071060886458, 112.66657338325173)
3. Point52 (-7.178849740125231, 112.68395966534315)
4. Point54 (-7.202104930031676, 112.71699090485501)
5. Point66 (-7.19291463285211, 112.71413709088606)
6. Point80 (-7.193933244193088, 112.73319067973448)
7. Point82 (-7.374403113808628, 112.70273656086516)
8. Point1  (-7.18440713482308, 112.75814941244877)
9. Point11 (-7.178628055218464, 112.73351252874933)
10. Point16 (-7.196467406581549, 112.80460824363027)
```

---

## 🔧  Customization

- Adjust `coordinatePrecision` in `planRouteByHammingDistance` for finer or coarser granularity.
- Modify `courierLocation` in `index.js` to set a different starting position.

---

## 📄  License

MIT License © 2025 [NeaByteLab](https://github.com/NeaByteLab)