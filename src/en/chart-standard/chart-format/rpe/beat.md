# Beat  

In RPE, `beat` is the time unit for all events. It is represented as an `int[3]` and displayed in RPE as `[0]:[1]/[2]`.  

The calculation for a single BPM is as follows:  

```csharp
double beat = RPEBeat[1] / RPEBeat[2] + RPEBeat[0];
double seconds = 60 / BPM * beat;
```

For multiple BPM calculation, refer to the Python example below.

## Python Example  
- Assume `self.BPMList` is a `list[BPMEvent]`.  
- Definition of `BPMEvent`:  
```python
@dataclass
class BPMEvent:
    startTime: Beat
    bpm: float
```
- In `sec2beat`, `t` represents seconds, and `bpmfactor` corresponds to the `bpmfactor` field in the judgment line.  
- In `beat2sec`, `t` represents beats, and `bpmfactor` corresponds to the `bpmfactor` field in the judgment line.  
- It holds that `beat2sec(sec2beat(x)) == x` and `sec2beat(beat2sec(x)) == x` both evaluate to `True`.  

The functions are defined as follows:  

```python
def sec2beat(self, t: float, bpmfactor: float):
    beat = 0.0
    for i, e in enumerate(self.BPMList):
        bpmv = e.bpm / bpmfactor
        if i != len(self.BPMList) - 1:
            et_beat = self.BPMList[i + 1].startTime.value - e.startTime.value
            et_sec = et_beat * (60 / bpmv)
            
            if t >= et_sec:
                beat += et_beat
                t -= et_sec
            else:
                beat += t / (60 / bpmv)
                break
        else:
            beat += t / (60 / bpmv)
    return beat

def beat2sec(self, t: float, bpmfactor: float):
    sec = 0.0
    for i, e in enumerate(self.BPMList):
        bpmv = e.bpm / bpmfactor
        if i != len(self.BPMList) - 1:
            et_beat = self.BPMList[i + 1].startTime.value - e.startTime.value
            
            if t >= et_beat:
                sec += et_beat * (60 / bpmv)
                t -= et_beat
            else:
                sec += t * (60 / bpmv)
                break
        else:
            sec += t * (60 / bpmv)
    return sec
```
