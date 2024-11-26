// HTML elements
const form = document.getElementById("paramForm")
const canvas = document.getElementById("graphCanvas")
const ctx = canvas.getContext("2d")
const equationDisplay = document.getElementById('equationDisplay')

// Canvas properties
const width = canvas.width
const height = canvas.height
const originX = width / 2
const originY = height / 2


function updateEquation(a,b,c) {
    equationDisplay.textContent = `f(x) = ${a}x² + ${b}x + ${c}`
}

// Graph the axis 
function drawAxis(scaleX, scaleY) {
        // Drawing the axis
        ctx.strokeStyle = "#FFFFFF"
        ctx.lineWidth = 5
        ctx.beginPath()
    
        // X
        ctx.moveTo(0, originY)
        ctx.lineTo(width, originY)
        console.log(originY)
    
        // Y
        ctx.moveTo(originX, 0)
        ctx.lineTo(originX, height)
        ctx.stroke()

        // Axis Labels
        ctx.fillStyle = '#FFFFFF'
        ctx.font = '16px Arial'
        ctx.fillText('Y', width / 2 + 10, 20)  
        ctx.fillText('X', width - 10, height / 2 - 10)  

        // X Axis points
        const stepX = 50 
        const unitX = scaleX 
        for (let x = -width / 2; x <= width / 2; x += stepX) {
            const canvasX = originX + x

            // Draw a little line to the point
            ctx.beginPath()
            ctx.moveTo(canvasX, originY - 5)
            ctx.lineTo(canvasX, originY + 5)
            ctx.stroke()

            // Draw the right number
            if (x !== 0) {
                const value = (x / stepX) * unitX // Escala al valor real
                ctx.fillText(value.toFixed(2), canvasX - 10, originY + 20)
            }
        }

        // Y Axis points
        const stepY = 50
        const unitY = scaleY 
        for (let y = -height / 2; y <= height / 2; y += stepY) {
            const canvasY = originY - y

            // Draw a little line to the point
            ctx.beginPath()
            ctx.moveTo(originX - 5, canvasY)
            ctx.lineTo(originX + 5, canvasY)
            ctx.stroke()

            // Draw the right number
            if (y !== 0) {
                const value = (y / stepY) * unitY 
                ctx.fillText(value.toFixed(2), originX + 10, canvasY + 5)
            }
        }
        
}

// Graph the square function
function graph(a, b, c, min, max) {
    // Show the equation in the web page
    updateEquation(a,b,c)

    // Clean the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const scaleX = width / (max - min) 
    const scaleY = height / (max - min) 
    drawAxis(scaleX, scaleY)


    // Draw the function
    ctx.strokeStyle = "blue"
    ctx.beginPath()
    for (let x = min; x <= max; x += 0.1) {
        const y = a * x ** 2 + b * x + c
        const canvasX = originX + x * scaleX
        const canvasY = originY - y * scaleY

        if (x === min) {
            ctx.moveTo(canvasX, canvasY)
        } else {
            ctx.lineTo(canvasX, canvasY)
        }
    }
    ctx.stroke()
}

// Submit button event
form.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get the function values
  const a = parseFloat(document.getElementById("a").value)
  const b = parseFloat(document.getElementById("b").value)
  const c = parseFloat(document.getElementById("c").value)
  const minX = parseFloat(document.getElementById("minX").value)
  const maxX = parseFloat(document.getElementById("maxX").value)

  // Validate the range if it is valid
  if (minX >= maxX) {
    alert("El rango mínimo debe ser menor que el máximo.")
    return
  }

  // Graficar la función
  graph(a, b, c, minX, maxX)
})
