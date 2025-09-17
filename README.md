TODO:
- [ ] модель для Wave
- [ ] DRACO сжатие
- [ ] Отрефакторить 
- [ ] Вращать env вместе с камерой / вращать только mesh

```
<script lang="ts">
	import { T } from '@threlte/core';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { touchScreen } from '$lib/store/touchScreen.svelte';
	import { type PerspectiveCamera, Quaternion, Vector3 } from 'three';
	import { combinedSpring } from '$lib/composables/combinedSpring.svelte';
	import { clamp } from '$lib/utils/clamp';

	let camera: PerspectiveCamera | undefined = $state();

	const mobileOptions = {
		stiffness: 0.002,
		damping: 1
	};

	const desktopOptions = {
		stiffness: 0.2,
		damping: 1
	};

	const position = combinedSpring([0, 0], touchScreen.current ? mobileOptions : desktopOptions);

	function rotateDevice(event: DeviceMotionEvent) {
		if (event.rotationRate === null) return;
		if (event.rotationRate.alpha === null || event.rotationRate.beta === null) return;

		position.targetValues = [
			event.rotationRate.beta * 0.1,
			event.rotationRate.alpha * 0.1,
		];
	}

	function moveMouse(event: MouseEvent) {
		position.targetValues = [
			(event.clientX - window.innerWidth / 2) * 0.0005,
			(event.clientY - window.innerHeight / 2) * 0.0005,
		];
	}

	$effect(() => {
		if (touchScreen.current) {
			position.updateOptions(mobileOptions);
		} else {
			position.updateOptions(desktopOptions);
		}
	});

	const RADIUS = 6;
	const offsetY = 0.5;

	$effect(() => {
		if (camera) {
			const originAngle = 20 * DEG2RAD + clamp(position.animatedValues[1], -0.25, 1);
			const pitch = 90 * DEG2RAD - originAngle;

			const projection = RADIUS * Math.sin(pitch);
			const positionY = RADIUS * Math.sin(originAngle);
			camera.position.y = positionY + offsetY;

			camera.position.x = Math.sin(-position.animatedValues[0]) * projection;
			camera.position.z = Math.cos(-position.animatedValues[0]) * projection;

			camera.quaternion.setFromAxisAngle(
				new Vector3(0, 1, 0),
				Math.atan2(camera.position.x, camera.position.z)
			);
			camera.quaternion.multiply(
				new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -Math.atan2(positionY, projection))
			);
		}
	});
</script>

<svelte:window ondevicemotion={rotateDevice} onmousemove={moveMouse} />

<T.PerspectiveCamera bind:ref={camera} makeDefault fov={45} />
```
