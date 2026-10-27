# Ray Checkpoint Inference Results

Ray’s checkpoints reproduce the Google pick-can result closely. Bridge falls short mainly on carrot placement, while GR1 bottle is slightly below the reported baseline.

This summary covers the completed runs in this folder. Paper baseline values and diagnostic findings come from the existing audit and comparison CSV.

## Completed results

| Task | Local successes | Local rate | Paper rate | Gap |
|---|---:|---:|---:|---:|
| Bridge: spoon | 14/24 | 58.3% | 58.3% | 0.0 pp |
| Bridge: carrot | 7/24 | 29.2% | 54.2% | −25.0 pp |
| Bridge: stack | 4/24 | 16.7% | 12.5% | +4.2 pp |
| Bridge: eggplant | 20/24 | 83.3% | 83.3% | 0.0 pp |
| **Bridge overall** | **45/96** | **46.9%** | **52.1%** | **−5.2 pp** |
| Google pick-can (VM) | 206/300 | 68.7% | 68.3% | +0.4 pp |
| GR1 bottle → cabinet | 19/50 | 38.0% | 42.0% | −4.0 pp |

Gaps are local minus paper success rates, in percentage points (pp).

## Interpretation

- **Carrot is the main discrepancy.** The audit found that 13 of its 17 failed episodes never registered a grasp; four grasped but failed final placement. The underlying cause remains unresolved.
- **Bridge’s aggregate was corrected.** The original summarizer excluded eggplant. The corrected four-task score is **46.875%**, or **46.9%** rounded. This correction changes only the aggregate and does not explain carrot’s task-level deficit.
- **Pick-can is consistent across two completed runs.** Both scored **206/300 = 68.7%**, with upright strongest at **92/100**, left/right at **73/100**, and laid vertically at **41/100**. Both runs use the **VM** protocol, so comparison against the VA baseline would be inappropriate.
- **GR1 is not yet a fully matched reproduction.** The completed run used **50 episodes with one environment**, versus ten parallel environments in the paper. The audit identifies differences in episode selection and policy sampling caused by this setting; their quantitative impact has not been measured. The earlier **0/5** smoke test is superseded by the completed **19/50** result.

## Coverage and next steps

Coverage is partial: Google move-near/drawer, VA evaluations, and the other five GR1 tasks have no completed results here. Missing evaluations should not be interpreted as zero success.

1. Run the prepared GR1 rerun script with 50 episodes and ten environments to match the stated paper protocol.
2. Investigate carrot grasp failures by comparing original commands, checkpoint hashes, initial observations, first predicted action chunks, and per-episode outcomes with Ray’s original evaluation, if available. The existing audit does not establish a unique cause.

## Result sources

- Bridge summary
- Google pick-can VM — run 1
- Google pick-can VM — run 2
- GR1 bottle summary
- GR1 bottle protocol

This document summarizes existing results and audit findings; no new inference or simulation runs were performed to produce it.
