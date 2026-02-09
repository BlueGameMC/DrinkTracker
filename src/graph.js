class barGraph
{
    constructor(data, canvas, wDistance)
    {
        this.data = data;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.wDistance = wDistance;
        canvas.width = (data.length + 1) * this.wDistance;

        this.height = canvas.height;
        this.width = canvas.width;

        this.calculateLines();
        this.displayGraph();

    }

    updateData(data)
    {
        this.data = data;
        this.canvas.width = (data.length + 1) * this.wDistance;

        this.height = this.canvas.height;
        this.width = this.canvas.width;

        this.calculateLines();
        this.displayGraph();
    }

    swapOrder()
    {
        let newData = [];
        for(let i = this.data.length-1; i >= 0; i--)
        {
            newData.push(this.data[i]);
        }
        return newData;
    }

    calculateLines()
    {
        this.linePadding = 50;
        this.lineHeight = this.height - this.linePadding;
        let highestScore = 0;
        for(let i = 0; i < this.data.length; i++)
        {
            highestScore = Math.max(highestScore, this.data[i][1]);
        }
        this.highestScore = highestScore;

        this.lineCount = 6;
        if(highestScore%this.lineCount != 0)
        {
            if(highestScore%5==0)
            {
                this.lineCount = 5;
            }
            else if(highestScore==1)
            {
                this.lineCount = 1;
            }
            else if(highestScore%9==0)
            {
                this.lineCount = 9;
            }
            else if(highestScore%7==0)
            {
                this.lineCount = 7;
            }
            else if(highestScore%3==0)
            {
                this.lineCount = 3;
            }
            else if(highestScore%2==0)
            {
                this.lineCount = 2;
            }
            else if(highestScore%4==0)
            {
                this.lineCount = 4;
            }
            
            
        }
        this.lineDistance = (this.lineHeight-100) / this.lineCount;
        this.lineValue = this.highestScore/this.lineCount;
    }

    drawLines()
    {
        this.ctx.font = "15px serif";
        for(let i = 0; i <= this.lineCount;i++)
        {
            this.ctx.fillRect(0,(this.height-100)-this.lineDistance*i,this.width,1);
            this.ctx.fillText((i*this.lineValue),5,((this.height-100)-this.lineDistance*i) - 5);
        }
    }

    displayGraph()
    {
        this.ctx.clearRect(0,0,this.width,this.height);
        this.drawLines();
        let textHeight = 100;
        let barHeight = this.height-textHeight;
        this.ctx.font = "15px sans serif";
        for(let i = 0; i < this.data.length; i++)
        {
            this.ctx.fillRect((i+1)*this.wDistance - 20,barHeight,20,-this.lineDistance * (this.data[i][1]/this.lineValue));
            // this.ctx.fillText(drinkName,(i+1)*this.wDistance - this.wDistance/2, this.height-(textHeight-30), this.wDistance*0.9);
            this.drawFormatName(this.data[i][0],(i+1)*this.wDistance - this.wDistance/2, this.height-(textHeight-30));
        }
    }

    drawFormatName(name, x, y)
    {
        let nameArr = name.split(" ");
        let newName ="";
        for(let i = 0; i < nameArr.length; i++)
        {
            if(newName.split("\n")[newName.split("\n").length-1].length + nameArr[i].length < 6)
            {
                newName += nameArr[i] + " ";
            }
            else
            {
                newName += nameArr[i] + "\n";
            }

        }
        
        for(let i = 0; i < newName.split("\n").length; i++)
        {
            this.ctx.fillText(newName.split("\n")[i],x,y + i*15);
        }
    }

}