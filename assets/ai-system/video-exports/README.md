# Design-system recording exports

Direct stills from the supplied 8:38 design-system walkthrough. The images retain the browser and documentation context so they remain truthful case-study evidence.

## Visible implementation patterns

The recording shows Angular consumers of an internal component package, including:

```ts
import { CheckboxComponent } from 'organization-components';
import { GaugeComponent } from 'organization-components';
```

```html
<er-dropdown
  [options]="optionsList"
  label="Label"
  placeholder="Select an option"
  formControlName="dropdown2">
</er-dropdown>

<er-checkbox [checked]="false" [label]="'Label'"></er-checkbox>
<er-checkbox [formControl]="checkedControl"></er-checkbox>
<er-checkbox
  [checked]="false"
  [label]="'Label'"
  [description]="'Description'"
  [error]="true">
</er-checkbox>
```

## Important provenance note

Only consumer snippets and public API descriptions are visible in the recording. Internal component source code is not present, so `video-components.css`, `video-components.js`, and `video-components-demo.html` are an independent visual reconstruction for portfolio use, not proprietary source.
